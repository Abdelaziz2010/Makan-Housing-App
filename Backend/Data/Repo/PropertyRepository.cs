﻿using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Repo
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DataContext dc;

        public PropertyRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<IEnumerable<Property>> GetPropertiesAsync(int sellRent)
        {
            var properties = await dc.Properties
                .Include(p => p.PropertyType)
                .Include(p => p.FurnishingType)
                .Include(p => p.City)
                .Include(p => p.User)
                .Where(p => p.SellRent == sellRent)
                .ToListAsync();
            return properties;
        }

        public void AddProperty(Property property)
        {
            dc.Properties.Add(property);
        }

        public void DeleteProperty(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Property> GetPropertyDetailAsync(int id)
        {
            var properties = await dc.Properties
            .Include(p => p.PropertyType)
            .Include(p => p.City)
            .Include(p => p.FurnishingType)
            .Include(p => p.Photos)
            .Where(p => p.Id == id)
            .FirstOrDefaultAsync();

            return properties;
        }
    }
}
