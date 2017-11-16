using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Scaffolder
{
    public class PropertyData
    {
        public string PropertyName { get; set; }

        /// <summary>
        /// This does not include the '.WithColumn("col_name")' but but any further method calls for that column, excluding the initial '.'
        ///                                                                                  e.g. 'AsString(255).NotNullable()'.
        /// </summary>
        public string FluentMigratorTypeInstruction { get; set; }
        
        public string PropertyType { get; set; }

        public void PopulatePropertyTypeFromDbFieldType()
        {
            if (FluentMigratorTypeInstruction.StartsWith("AsString") || FluentMigratorTypeInstruction.StartsWith("AsMaxString"))
            {
                PropertyType = "string";
            }
            else if (FluentMigratorTypeInstruction.StartsWith("AsBoolean"))
            {
                PropertyType = "bool";
            }
            else if (FluentMigratorTypeInstruction.StartsWith("AsInt32"))
            {
                PropertyType = "int";
            }
            else if (FluentMigratorTypeInstruction.StartsWith("AsDate"))
            {
                PropertyType = "DateTime";
            }
            else if (FluentMigratorTypeInstruction.StartsWith("AsCurrency") ||
                     FluentMigratorTypeInstruction.StartsWith("AsDecimal") ||
                FluentMigratorTypeInstruction.StartsWith("AsDouble"))
            {
                PropertyType = "decimal";
            }
            else
            {
                throw new ApplicationException(String.Format("FluentMigratorTypeInstruction not recognized: {0)", FluentMigratorTypeInstruction));
            }

            if (PropertyType != "string" && FluentMigratorTypeInstruction.Contains(".Nullable()"))
            {
                PropertyType += "?";
            }
        }
    }
}
