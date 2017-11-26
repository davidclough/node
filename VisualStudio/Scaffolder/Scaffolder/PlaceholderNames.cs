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

        // The addition captures an optional "+ followed by 1 or more digits" to specify how much should be added to the current Unix time stamp.
        public const string MigrationTimeStampRegex = @"{{MIGRATION_TIME_STAMP(?<addition>\+\d+)?}}";

        public const string PropertyCount = "{{PROPERTY_COUNT}}";
        // The addition captures an optional "+ followed by 1 or more digits" to specify how much should be added to the current Unix time stamp.
        public const string CustomPropertyCount = @"{{CUSTOM_PROPERTY_COUNT(?<addition>\+\d+)?}}";

        public const string VersionMigrationNamespace = "{{VERSION_MIGRATION_NAMESPACE}}";
        public const string VersionMigrationFolderName = "{{VERSION_MIGRATION_FOLDERNAME}}";

        public const string ApiVersion = "{{API_VERSION}}";

        public const string TargetSolutionPath = "{{TARGET_SOLUTION_PATH}}";
    }
}
