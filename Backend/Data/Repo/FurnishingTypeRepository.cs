using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Repo
{
    public class FurnishingTypeRepository: IFurnishingTypeRepository
    {
        private readonly DataContext dc;

        public FurnishingTypeRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<IEnumerable<FurnishingType>> GetFurnishingTypesAsync()
        {
            var furnishinfTypes = await dc.FurnishingTypes.ToListAsync();
            return furnishinfTypes;
        }
    }
}
