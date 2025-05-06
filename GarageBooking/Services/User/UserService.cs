using GarageBooking.Extensions;
using NHibernate;
using NHibernate.Linq;

namespace GarageBooking.Services.User;

public class UserService : IUserService
{
    private ISessionFactory _sessionFactory;

    public UserService(ISessionFactory sessionFactory)
    {
        _sessionFactory = sessionFactory;
    }

    public async Task<Models.User> GetUserAsync(string email)
    {
        using var session = _sessionFactory.OpenSession();

        var user = await session.Query<Entities.User>()
            .SingleOrDefaultAsync(x => x.Email == email);

        return user.ToModel();
    }

    public async Task<Models.User> SaveUserAsync(Models.User model)
    {
        using var session = _sessionFactory.OpenSession();
        using var transaction = session.BeginTransaction();

        var entity = model.Id != default
            ? await session.GetAsync<Entities.User>(model.Id)
            : new Entities.User();

        entity.Name = model.Name;
        entity.Email = model.Email;
        entity.Password = model.Password;
        entity.Role = model.Role.ToEntity();

        await session.SaveOrUpdateAsync(entity);
        await transaction.CommitAsync();

        return entity.ToModel();
    }
}