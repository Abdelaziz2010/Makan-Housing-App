using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class City: BaseEntity
    {
        [Required]
        [Column(Order = 1)]
        public string Name { get; set; }
        [Required]
        [Column(Order = 2)]
        public string Country { get; set; }
    }
}
