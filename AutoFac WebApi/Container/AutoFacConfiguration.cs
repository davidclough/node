#define SET_CUSTOM_INTERCEPTORS_WHEN_IN_DEBUG

using System;
using Autofac;
using Autofac.Extras.DynamicProxy2;
using Abc.AutoMapper.V1;
using Abc.AzureBlobStorageConfigurationProvider;
using Abc.Business.Business;
using Abc.Business.Classes;
using Abc.Business.Utilities;
using Abc.ClientDataProvider.External;
using Abc.Common;
using Abc.Common.API.Config;
using Abc.Common.API.Utilities;
using Abc.Common.Classes;
using Abc.Common.Interfaces;
using Abc.Common.Utilities;
using Abc.Common.Utilities.Csv;
using Abc.Container.AutoFac.Common.Extensions;
using Abc.Container.AutoFac.Common.LogInterception;
using Abc.DataContractValidator.V1;
using Abc.Interfaces.Business;
using Abc.Interfaces.Business.Classes;
using Abc.Interfaces.Business.Utilities;
using Abc.Interfaces.ClientDataProvider.External.Factorys;
using Abc.Interfaces.Common;
using Abc.Interfaces.Common.Api;
using Abc.Interfaces.Common.Utilities;
using Abc.Interfaces.DataContractValidator;
using Abc.Interfaces.Repositories;
using Abc.Repositories.Repositories;
using Abc.Repositories.UnitOfWork;
using Abc.Interfaces.ObjectMapper.WebApi;
using Abc.Interfaces.Repositories.Documents;
using Abc.Logging.Core.Handlers;
using Abc.Logging.Core.Utilities;
using Abc.Logging.Exceptionless;
using Abc.Logging.Interfaces;
using Abc.Logging.Interfaces.Utilities;
using Abc.Logging.Log4Net;
using Abc.Repositories.DocumentStore;
using Abc.StorageProcessor.Interfaces.AzureSetup;
using Abc.StorageProcessor.Interfaces.Repositories;

namespace Abc.Container
{
    public class AutoFacConfiguration
    {
        private static ContainerBuilder _apibuilder;
        private static IContainer _apiContainer;

        private static ContainerBuilder _webApiBuilder;
        private static IContainer _webApiContainer;

        // NOTE(DC): Have put [DebuggerStepThrough] on both the annoying methods but having the option of just not using them when debugging reduces
        //           the logging to a more manageable number of entries, even with LogLevel DEBUG. For example, 43 log entries, many for method
        //           entered/exited were being logged for a successful call to _emailQueueBusiness.CreateEmailItem().
        static AutoFacConfiguration()
        {
#if !DEBUG || !SET_CUSTOM_INTERCEPTORS_WHEN_IN_DEBUG
            DefaultInterceptorTypes = new[]
            {
                typeof(AutoFacLoggingInterceptor),
                typeof(AutoFacPerformanceInterceptor),
            };
#else
            DefaultInterceptorTypes = new Type[] { };
#endif
        }

        private static readonly Type[] DefaultInterceptorTypes;

        internal static ContainerBuilder ApiBuilder
        {
            get
            {
                if (_apibuilder == null)
                {
                    var requiredLifetimeScope = LifetimeScopeType.PerLifetimeScope;

                    _apibuilder = new ContainerBuilder();

                    RegisterTypes(_apibuilder, requiredLifetimeScope);
                    RegisterVersionTypes(_apibuilder, requiredLifetimeScope);
                }

                return _apibuilder;
            }
        }

        internal static IContainer ApiContainer
        {
            get
            {
                if (_apiContainer == null)
                {
                    _apiContainer = ApiBuilder.Build();
                }

                return _apiContainer;
            }
        }

        public static ContainerBuilder WebApiBuilder
        {
            get
            {
                if (_webApiBuilder == null)
                {
                    var requiredLifetimeScope = LifetimeScopeType.PerLifetimeScope;

                    _webApiBuilder = new ContainerBuilder();

                    RegisterTypes(_webApiBuilder, requiredLifetimeScope);
                    RegisterVersionTypes(_webApiBuilder, requiredLifetimeScope);
                }

                return _webApiBuilder;
            }
        }

        public static IContainer WebApiContainer
        {
            get
            {
                if (_webApiContainer == null)
                {
                    _webApiContainer = WebApiBuilder.Build();
                }

                return _webApiContainer;
            }
        }

        public static T CreateWebApiInstance<T>()
        {
            return WebApiContainer.Resolve<T>();
        }

        private static void RegisterVersionTypes(ContainerBuilder container, LifetimeScopeType lifetimeScopeType)
        {
            container.RegisterType<AutoMapperConfigurationV1>().As<IWebApiMapperingConfigurationV1>().SingleInstance();
            container.RegisterType<DataContractValidatorV1>().As<IDataContractValidatorV1>().SingleInstance();
        }

        /// <summary>Registers the type mappings with the Unity container.</summary>
        /// <param name="container">The unity container to configure.</param>
        /// <param name="lifetimeScopeType">The required lifetime settings for the platform dependent parts of the sysytem.</param>
        /// <remarks>There is no need to register concrete types such as controllers or API controllers (unless you want to 
        /// change the defaults), as Unity allows resolving a concrete type even if it was not previously registered.</remarks>
        private static void RegisterTypes(ContainerBuilder container, LifetimeScopeType lifetimeScopeType)
        {
            container.RegisterType<BaseConfigurationProvider>().As<IConfigurationProvider>().As<IConfigurationProviderWritable>();
            
            // Register Mongo
            container.RegisterType<MongoInstanceFactory>().As<IMongoInstanceFactory>().SetLifeTime(lifetimeScopeType).EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);

            // Unit of work
            container.RegisterType<UnitOfWorkFactory>().As<IUnitOfWorkFactory>().As<IUnitOfWorkGetInstanceFactory>().As<IUnitOfWorkCreateInstanceFactory>().As<IUnitOfWorkGetCreateInstanceFactory>().SetLifeTime(lifetimeScopeType);

            // User Utils
            container.RegisterType<WebApiRequestUserUtilities>().As<IUserUtilities>().SetLifeTime(lifetimeScopeType);
            
            // Utils
            container.RegisterType<NewtonsoftJsonConvertor>().As<IJsonSerializer>();

            RegisterLoggingTypes(container, lifetimeScopeType);
            RegisterBusinessTypes(container, lifetimeScopeType);
            RegisterInterceptorTypes(container, lifetimeScopeType);
            RegisterBusinessUtilityTypes(container, lifetimeScopeType);
            RegisterRepositoryTypes(container, lifetimeScopeType);
            RegisterClientDataProviderTypes(container, lifetimeScopeType);
            
            // Module Factory 
            container.RegisterType<ExternalWebApiClientFactory>().As<IExternalWebApiClientFactory>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);

            RegisterFileUploadTypes(container, lifetimeScopeType);
        }

        private static void RegisterClientDataProviderTypes(ContainerBuilder container, LifetimeScopeType lifetimeScopeType)
        {
            //This will be where services relating to third party services, e.g. Train Data
        }

        private static void RegisterFileUploadTypes(ContainerBuilder container, LifetimeScopeType lifetimeScopeType)
        {
            container.RegisterType<FileBlobHandlerConfigurationProvider>().As<IFileBlobHandlerConfigurationProvider>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            
//#if DEBUG
            container.RegisterType<FileBlobHandler>().As<IFileHandler>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
//#else
//            container.RegisterType<Abc.StorageProcessor.AzureBlobHandler.AzureFileBlobHandler>().As<IFileHandler>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
//#endif
        }

        private static void RegisterInterceptorTypes(ContainerBuilder container, LifetimeScopeType lifetimeScopeType)
        {
            container.Register(c => new AutoFacLoggingInterceptor(c.Resolve<ILoggingHandler>()));
            container.Register(c => new AutoFacPerformanceInterceptor(c.Resolve<ILoggingHandler>()));
        }

        private static void RegisterLoggingTypes(ContainerBuilder container, LifetimeScopeType lifetimeScopeType)
        {
            container.RegisterType<WebAppConfigLogConfigProvider>().As<ILogConfigProvider>();
            container.RegisterType<RollingLog4NetLogger>().As<ILogDebug>().As<ILogError>().As<ILogFatal>().As<ILogInfo>().As<ILogWarn>();
            container.RegisterType<ExceptionlessLogger>().As<ILogError>().As<ILogFatal>();
            container.RegisterType<LoggingHandler>().As<ILoggingHandler>().SetLifeTime(lifetimeScopeType);
        }

        private static void RegisterBusinessUtilityTypes(ContainerBuilder container, LifetimeScopeType lifetimeScopeType)
        {
            container.RegisterType<UtcDateTimeUtility>().As<IDateTimeUtility>().As<IFinancialDateTimeUtility>().SetLifeTime(lifetimeScopeType);
            container.RegisterType<HashingUtility>().As<IHashingUtility>();
            container.RegisterType<FilenameUtility>().As<IFilenameUtility>();
            container.RegisterType<CreatableUtility>().As<ICreatableUtility>();
            container.RegisterType<ModifiableUtility>().As<IModifiableUtility>();
            container.RegisterType<EncryptionUtility>().As<IEncryptionUtility>();
            container.RegisterType<EncryptionHelper>().As<IEncryptionHelper>();
            container.RegisterType<SubcontractDetailsChangeUtility>().As<ISubcontractDetailsChangeUtility>();
            container.RegisterType<CsvHelperCsvCreator>().As<ICsvFluentCreator>();
        }

        private static void RegisterBusinessTypes(ContainerBuilder container, LifetimeScopeType lifetimeScopeType)
        {
            container.RegisterType<ApiKeyBusiness>().As<IApiKeyBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<ConfigurationBusiness>().As<IConfigurationBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<LoginBusiness>().As<ILoginBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<UserBusiness>().As<IUserBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<UserTokenBusiness>().As<IUserTokenBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<PermissionBusiness>().As<IPermissionBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<RoleBusiness>().As<IRoleBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<RolePermissionBusiness>().As<IRolePermissionBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<ReferenceDataBusiness>().As<IReferenceDataBusiness>();
            container.RegisterType<RegistrationBusiness>().As<IRegistrationBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<RewardBusiness>().As<IRewardBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<SubcontractorBusiness>().As<ISubcontractorBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<SkillsCardBusiness>().As<ISkillsCardBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<SkillsCardTypeBusiness>().As<ISkillsCardTypeBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<TaxSummaryBusiness>().As<ITaxSummaryBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<VideoBusiness>().As<IVideoBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);

#if DEBUG
            container.RegisterType<LocalEmailQueueBusiness>().As<IEmailQueueBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
#else
            container.RegisterType<EmailQueueBusiness>().As<IEmailQueueBusiness>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
#endif
        }

        private static void RegisterRepositoryTypes(ContainerBuilder container, LifetimeScopeType lifetimeScopeType)
        {
            container.RegisterType<ApiKeyRepository>().As<IApiKeyRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<ConfigurationRepository>().As<IConfigurationRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<EmailQueueItemRepository>().As<IEmailMailQueueItemRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<FileUploadQueueRepository>().As<IFileUploadQueueItemRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<PermissionRepository>().As<IPermissionRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<ReferenceDataRepository>().As<IReferenceDataRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<RolePermissionRespository>().As<IRolePermissionRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<RoleRepository>().As<IRoleRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<SystemCategoryRepository>().As<ISystemCategoryRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<UserFileAccessRepository>().As<IUserFileAccessRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<UserForgotPasswordRequestRepository>().As<IUserForgotPasswordRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<UserRepository>().As<IUserRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<UserTokenRepository>().As<IUserTokenRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<RegistrationRepository>().As<IRegistrationRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<RewardsBannerRepository>().As<IRewardsBannerRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<SubcontractorRepository>().As<ISubcontractorRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<CountryRepository>().As<ICountryRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<SkillsCardRepository>().As<ISkillsCardRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<SkillsCardTypeRepository>().As<ISkillsCardTypeRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<SubcontractorDetailsChangeRepository>().As<ISubcontractorDetailsChangeRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<TaxSummaryRepository>().As<ITaxSummaryRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<TermsAndConditionRepository>().As<ITermsAndConditionRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
            container.RegisterType<VideoRepository>().As<IVideoRepository>().EnableInterfaceInterceptors().InterceptedBy(DefaultInterceptorTypes);
        }
    }
}
