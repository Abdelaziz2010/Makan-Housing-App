using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext dc;

        public CityRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddCity(City city)
        {
            dc.Cities.Add(city);
        }

        public void DeleteCity(int cityId)
        {
            var city = dc.Cities.Find(cityId);
            dc.Cities.Remove(city);
        }

        public async Task<City> FindCity(int Id)
        {
            var city = await dc.Cities.FindAsync(Id);
            return city;
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await dc.Cities.ToListAsync();
        }
    }
}
