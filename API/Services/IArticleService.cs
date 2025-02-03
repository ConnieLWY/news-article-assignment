using API.Models;

namespace API.Services
{
    public interface IArticleService
    {
        List<Article> Get();
        Article Get(string id);
        Article Create(Article article);
        void Update(string id, Article article);
        void Remove(string id);
    }
}
