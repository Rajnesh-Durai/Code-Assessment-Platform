using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace AssessmentPortal.Infrastructure.HealthCheck
{
    public class DatabaseCheck : IHealthCheck
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public DatabaseCheck(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("Assessment")!;
        }
        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    await connection.OpenAsync(cancellationToken);
                    return HealthCheckResult.Healthy();
                }
                catch (Exception ex)
                {
                    return HealthCheckResult.Unhealthy("Database connection issue", ex, new Dictionary<string, object> { { "ExceptionDetails", ex.ToString() } });
                }
            }
        }
    }
}
