using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentMigrator;

namespace SuperApi.FluentMigrator.Migrations._001._000._000
{
    [Migration(1510862641)]
    public class AddWashingMachinesTable : Migration
    {
        private const string DefaultSchema = "dbo";

        private const string WashingMachineTable = "WashingMachine";
        private const string UserTable = "User";

        private const string CreatedByUserIdColumn = "CreatedByUserId";
        private const string ModifiedByUserIdColumn = "ModifiedByUserId";
        private const string UserIdColumn = "UserId";

        private readonly string WashingMachineCreatedByToUserForeignKey = "FK_WashingMachine_User_" + CreatedByUserIdColumn;
        private readonly string WashingMachineModifiedByToUserForeignKey = "FK_WashingMachine_User_" + ModifiedByUserIdColumn;

        private readonly Guid MySpecialId = new Guid("e304c6bb-33e8-4677-b943-c9eef6e64000");
        private readonly Guid MyOtherSpecialId = new Guid("e304c6bb-33e8-4677-b943-c9eef6e64000");

        public override void Up()
        {
            Create.Table(WashingMachineTable).InSchema(DefaultSchema)
               .WithColumn("WashingMachineId").AsGuid().NotNullable().PrimaryKey("PK_WashingMachine")
               .WithColumn("ModelName").AsString(255).NotNullable()
               .WithColumn("HasDryer").AsBoolean.Nullable()
               .WithColumn("CreatedDateTime").AsDateTime().NotNullable()
               .WithColumn(CreatedByUserIdColumn).AsGuid().NotNullable()
               .WithColumn("ModifiedDateTime").AsDateTime().NotNullable()
               .WithColumn(ModifiedByUserIdColumn).AsGuid().NotNullable();

            Create.ForeignKey(WashingMachineCreatedByToUserForeignKey)
                .FromTable(WashingMachineTable)
                .ForeignColumn(CreatedByUserIdColumn)
                .ToTable(UserTable)
                .PrimaryColumn(UserIdColumn);

            Create.ForeignKey(WashingMachineModifiedByToUserForeignKey)
                .FromTable(WashingMachineTable)
                .ForeignColumn(ModifiedByUserIdColumn)
                .ToTable(UserTable)
                .PrimaryColumn(UserIdColumn);
        }

        public override void Down()
        {
            if (Schema.Table(WashingMachineTable).Constraint(WashingMachineCreatedByToUserForeignKey).Exists())
            {
                Delete.ForeignKey(WashingMachineCreatedByToUserForeignKey).OnTable(WashingMachineTable);
            }

            if (Schema.Table(WashingMachineTable).Constraint(WashingMachineModifiedByToUserForeignKey).Exists())
            {
                Delete.ForeignKey(WashingMachineModifiedByToUserForeignKey).OnTable(WashingMachineTable);
            }

            if (Schema.Table(WashingMachineTable).Exists())
            {
                Delete.Table(WashingMachineTable);
            }
        }
    }
}
