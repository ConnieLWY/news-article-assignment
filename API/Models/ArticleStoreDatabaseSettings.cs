namespace API.Models
{
    public class ArticleStoreDatabaseSettings:IArticleStoreDatabaseSettings
    {
        public string ConnectionURI { get; set; } = String.Empty!;
        public string DatabaseName { get; set; } = String.Empty!;
        public string CollectionName { get; set; } = String.Empty!;
    }
}
