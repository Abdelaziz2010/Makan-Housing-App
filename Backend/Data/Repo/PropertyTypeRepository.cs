using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Repo
{
    public class PropertyTypeRepository : IPropertyTypeRepository
    {
        private readonly DataContext dc;

        public PropertyTypeRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<IEnumerable<PropertyType>> GetPropertyTypesAsync()
        {
            var propertyTypes = await dc.PropertyTypes.ToListAsync();
            return propertyTypes;
        }
    }
}
