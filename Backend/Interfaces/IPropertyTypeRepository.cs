using Backend.Models;

namespace Backend.Interfaces
{
    public interface IPropertyTypeRepository
    {
        Task<IEnumerable<PropertyType>> GetPropertyTypesAsync();
    }
}
