using API.Models;
using MongoDB.Driver;

namespace API.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IMongoCollection<Article> _articles;

        public ArticleService(IArticleStoreDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _articles = database.GetCollection<Article>(settings.CollectionName);
        }

        public Article Create(Article article)
        {
            _articles.InsertOne(article);
            return article;
        }

        public List<Article> Get()
        {
            return _articles.Find(article => true).ToList();
        }

        public Article Get(string id)
        {
            return _articles.Find(article => article.Id == id).FirstOrDefault();
        }

        public void Remove(string id)
        {
            _articles.DeleteOne(article => article.Id == id);
        }

        public void Update(string id, Article updatedArticle)
        {
            var existingArticle = _articles.Find(article => article.Id == id).FirstOrDefault();
            if (existingArticle != null)
            {
                updatedArticle.Id = id;
                // Preserve the original CreatedAt
                updatedArticle.CreatedAt = existingArticle.CreatedAt;
                // Set UpdatedAt to now
                updatedArticle.SetUpdatedAt();

                _articles.ReplaceOne(article => article.Id == id, updatedArticle);
            }
        }
    }
}
