using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public abstract class BaseDocument
    {
        [BsonElement("create_at")]
        public DateTime CreatedAt { get; internal set; }

        [BsonElement("updated_at")]
        public DateTime? UpdatedAt { get; private set; }

        protected BaseDocument()
        {
            CreatedAt = DateTime.UtcNow;
        }

        public void SetUpdatedAt()
        {
            UpdatedAt = DateTime.UtcNow;
        }
    }

    public class Article : BaseDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("summary")]
        public List<string> Summary { get; set; } = new List<string>();

        [BsonElement("publisher")]
        public string Publisher { get; set; }
    }
}
