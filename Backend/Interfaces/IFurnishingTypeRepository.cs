using Backend.Models;

namespace Backend.Interfaces
{
    public interface IFurnishingTypeRepository
    {
        Task<IEnumerable<FurnishingType>> GetFurnishingTypesAsync();
    }
}
