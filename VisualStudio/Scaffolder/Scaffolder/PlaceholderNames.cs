using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Scaffolder
{
    public static class PlaceholderNames
    {
        public const string Entity = "Xyz";
        public static readonly string EntityCamelCase = Entity.ToCamelCase();

        public const string TemplateRegexFormat = "{{INSTRUCTION:.+?}}";
        public static readonly string ForEachPropertyRegex = TemplateRegexFormat.Replace("INSTRUCTION", "FOR_EACH_PROPERTY");
        public static readonly string ForEachPropertyAddFinalSemiColonRegex = TemplateRegexFormat.Replace("INSTRUCTION", "FOR_EACH_PROPERTY_ADD_FINAL_SEMI_COLON");
        public static readonly string ForEachPropertyRemoveFinalCommaRegex = TemplateRegexFormat.Replace("INSTRUCTION", "FOR_EACH_PROPERTY_REMOVE_FINAL_COMMA");

        public const string SolutionNamespace = "{{SOLUTION_NAMESPACE}}";

        public const string NewGuid = "{{NEW_GUID}}";
        public const string MigrationTimeStamp = "{{MIGRATION_TIME_STAMP}}";

        public const string VersionMigrationNamespace = "{{VERSION_MIGRATION_NAMESPACE}}";
        public const string VersionMigrationFolderName = "{{VERSION_MIGRATION_FOLDERNAME}}";

        public const string ApiVersionNumber = "{{API_VERSION_NUMBER}}";
    }
}
