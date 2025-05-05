using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;

namespace GarageBooking.Persistence;

public class SessionFactoryBuilder
{
    public static ISessionFactory CreateSessionFactory(string connectionString)
    {
        return Fluently.Configure()
            .Database(PostgreSQLConfiguration.Standard
                .ConnectionString(connectionString)
                .ShowSql())
            .Mappings(m => m.FluentMappings.AddFromAssemblyOf<SessionFactoryBuilder>())
            .ExposeConfiguration(BuildSchema)
            .BuildSessionFactory();
    }

    private static void BuildSchema(Configuration config)
    {
        new SchemaUpdate(config).Execute(false, true);
    }
}