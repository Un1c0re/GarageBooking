using FluentMigrator;

namespace GarageBooking.Migrations;

[Migration(2025050501)]
public class InitialMigration : Migration
{
    public override void Up()
    {
        Create.Table("roles")
            .WithColumn("id").AsInt32().PrimaryKey().Identity()
            .WithColumn("name").AsString(100).NotNullable();

        Create.Table("users")
            .WithColumn("id").AsInt32().PrimaryKey().Identity()
            .WithColumn("role_id").AsInt32().ForeignKey("roles", "id")
            .WithColumn("name").AsString(100).NotNullable()
            .WithColumn("email").AsString(100).NotNullable()
            .WithColumn("password").AsString(100).NotNullable();

        Create.Table("garage_events")
            .WithColumn("id").AsInt32().PrimaryKey().Identity()
            .WithColumn("user_id").AsInt32().ForeignKey("users", "id")
            .WithColumn("title").AsString(100).NotNullable()
            .WithColumn("event_date").AsDateTime().NotNullable()
            .WithColumn("start_time").AsDateTime().NotNullable()
            .WithColumn("end_time").AsDateTime().NotNullable();
    }

    public override void Down()
    {
        Delete.Table("garage_events");
        Delete.Table("users");
        Delete.Table("roles");
    }
}