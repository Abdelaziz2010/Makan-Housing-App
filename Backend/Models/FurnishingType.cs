using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class FurnishingType : BaseEntity
    {
        [Required]
        public string Name { get; set; }
    }
}
