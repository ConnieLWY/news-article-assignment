using System.ComponentModel.DataAnnotations;

namespace API.Models.DTOs
{
    public class CreateArticleDto
    {
        [Required]
        public string Title { get; set; } = null!;

        [Required]
        public List<string> Summary { get; set; } = new List<string>();

        [Required]
        public string Publisher { get; set; } = null!;
    }
}
