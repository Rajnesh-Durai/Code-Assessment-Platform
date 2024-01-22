namespace AssessmentPortal.Application.Exceptions
{
    public class CustomException : Exception
    {
        public string ErrorCode { get; }

        public CustomException(string errorCode) : base(GetExceptionMessage(errorCode))
        {
            ErrorCode = errorCode;
        }

        public CustomException(string errorCode, Exception innerException) : base(GetExceptionMessage(errorCode), innerException)
        {
            ErrorCode = errorCode;
        }

        private static string GetExceptionMessage(string errorCode)
        {
            Dictionary<string, string> exceptionMessages = new Dictionary<string, string>
        {
            { "NoId", "Id is not matched. Try Again" },
            { "CantEmpty", "This Entry cannot be null" },
            { "Invalid", "Invalid data in the request." },
            {"Exist","User already exist or invalid data." },
            {"Unhandled","Unhandled exception has occured" }
        };

            if (exceptionMessages.TryGetValue(errorCode, out string? message))
            {
                return message;
            }

            return "An unspecified error occurred.";
        }
    }

}
