using System.Data;

namespace IDSFintechPortal.Api.Interfaces
{
    public interface IDbConnectionFactory
    {
        IDbConnection CreateConnection();
    }
}