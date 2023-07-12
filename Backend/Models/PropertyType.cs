using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class PropertyType : BaseEntity
    {
        [Required]
        public string Name { get; set; }
    }
}
