using API.Models;
using API.Models.DTOs;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService articleService;

        public ArticleController(IArticleService articleService)
        {
            this.articleService = articleService;
        }

        [HttpGet]
        public ActionResult<List<Article>> Get()
        {
            var articlesQuery = articleService.Get();
            articlesQuery = articlesQuery.OrderByDescending(a => a.CreatedAt).ToList();
            return articlesQuery;
        }

        [HttpGet("get/{id}")]
        public ActionResult<Article> Get(string id)
        {
            var article = articleService.Get(id);

            if (article == null)
            {
                return NotFound($"Article with id = {id} not found");
            }

            return article;
        }

        [HttpGet("paginated")]
        public async Task<ActionResult<PaginatedResponse<Article>>> GetPaginated(
            [FromQuery] string? searchTerm = null,
    [FromQuery] int pageNumber = 1,
    [FromQuery] int pageSize = 5)
        {
            var articlesQuery = articleService.Get();

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                searchTerm = searchTerm.ToLower();
                articlesQuery = articlesQuery.Where(a =>
                    a.Title.ToLower().Contains(searchTerm) ||
                    a.Publisher.ToLower().Contains(searchTerm) ||
                    a.Summary.Any(s => s.ToLower().Contains(searchTerm))
                ).ToList();
            }

            var totalArticles = articlesQuery.Count;
            articlesQuery = articlesQuery.OrderByDescending(a => a.CreatedAt).ToList();
            var articles = articlesQuery
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PaginatedResponse<Article>
            {
                Items = articles,
                TotalItems = totalArticles,
                CurrentPage = pageNumber,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalArticles / (double)pageSize)
            };
        }

        [HttpPost("create")]
        public ActionResult<Article> Post([FromBody] CreateArticleDto createDto)
        {
            var article = new Article
            {
                Title = createDto.Title,
                Summary = createDto.Summary,
                Publisher = createDto.Publisher
            };

            var createdArticle = articleService.Create(article);
            return CreatedAtAction(nameof(Get), new { id = createdArticle.Id }, createdArticle);
        }

        [HttpPut("update/{id}")]
        public ActionResult Put(string id, [FromBody] UpdateArticleDto updateDto)
        {
            var article = new Article
            {
                Id = id,
                Title = updateDto.Title,
                Summary = updateDto.Summary,
                Publisher = updateDto.Publisher
            };

            var existingArticle = articleService.Get(id);
            if (existingArticle == null)
            {
                return NotFound($"Article with Id = {id} not found");
            }

            articleService.Update(id, article);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public ActionResult Delete(string id)
        {
            var article = articleService.Get(id);

            if (article == null)
            {
                return NotFound($"Article with Id = {id} not found");
            }

            articleService.Remove(article.Id);

            return Ok($"Article with Id = {id} deleted");
        }
    }
}
