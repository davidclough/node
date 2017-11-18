using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentMigrator;

namespace SuperApi.FluentMigrator.Migrations.{{VERSION_MIGRATION_NAMESPACE}}
{
    [Migration({{MIGRATION_TIME_STAMP}})]
    public class AddXyzTable : Migration
    {
        private const string DefaultSchema = "dbo";

        private const string XyzTable = "Xyz";
        private const string UserTable = "User";

        private const string CreatedByUserIdColumn = "CreatedByUserId";
        private const string ModifiedByUserIdColumn = "ModifiedByUserId";
        private const string UserIdColumn = "UserId";

        private readonly string XyzCreatedByToUserForeignKey = "FK_Xyz_User_" + CreatedByUserIdColumn;
        private readonly string XyzModifiedByToUserForeignKey = "FK_Xyz_User_" + ModifiedByUserIdColumn;

        private readonly Guid MySpecialId = new Guid("{{NEW_GUID}}");
        private readonly Guid MyOtherSpecialId = new Guid("{{NEW_GUID}}");

        public override void Up()
        {
            Create.Table(XyzTable).InSchema(DefaultSchema)
               .WithColumn("XyzId").AsGuid().NotNullable().PrimaryKey("PK_Xyz")
{{FOR_EACH_PROPERTY:
               .WithColumn("PropertyName").FluentMigratorTypeInstruction
}}
               .WithColumn("IsDeleted").AsBoolean().NotNullable()
               .WithColumn("CreatedDateTime").AsDateTime().NotNullable()
               .WithColumn(CreatedByUserIdColumn).AsGuid().NotNullable()
               .WithColumn("ModifiedDateTime").AsDateTime().NotNullable()
               .WithColumn(ModifiedByUserIdColumn).AsGuid().NotNullable();

            Create.ForeignKey(XyzCreatedByToUserForeignKey)
                .FromTable(XyzTable)
                .ForeignColumn(CreatedByUserIdColumn)
                .ToTable(UserTable)
                .PrimaryColumn(UserIdColumn);

            Create.ForeignKey(XyzModifiedByToUserForeignKey)
                .FromTable(XyzTable)
                .ForeignColumn(ModifiedByUserIdColumn)
                .ToTable(UserTable)
                .PrimaryColumn(UserIdColumn);
        }

        public override void Down()
        {
            if (Schema.Table(XyzTable).Constraint(XyzCreatedByToUserForeignKey).Exists())
            {
                Delete.ForeignKey(XyzCreatedByToUserForeignKey).OnTable(XyzTable);
            }

            if (Schema.Table(XyzTable).Constraint(XyzModifiedByToUserForeignKey).Exists())
            {
                Delete.ForeignKey(XyzModifiedByToUserForeignKey).OnTable(XyzTable);
            }

            if (Schema.Table(XyzTable).Exists())
            {
                Delete.Table(XyzTable);
            }
        }
    }
}
