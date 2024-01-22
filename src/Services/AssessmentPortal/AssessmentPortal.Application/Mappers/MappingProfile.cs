using AssessmentPortal.Application.Features.Commands;
using AssessmentPortal.Application.Notifications;
using AssessmentPortal.Application.ViewModels;
using AssessmentPortal.Domain.CoreModels;
using AssessmentPortal.Domain.DTOs;
using AutoMapper;

namespace AssessmentPortal.Application.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserDTO, CreateUserCommand>().ReverseMap();
            CreateMap<UserAssessmentDTO, CreateUserAssessmentCommand>().ReverseMap();
            CreateMap<UserResultDTO, CreateUserResultCommand>().ReverseMap();
            CreateMap<CreateUserAssessmentCommand, UserAssessment>().ReverseMap();
            CreateMap<CreateUserCommand, User>().ReverseMap();
            CreateMap<CreateUserResultCommand, UserResult>().ReverseMap();
            CreateMap<UserResultDTO, UserResultResponse>().ReverseMap();
            CreateMap<User, UserResponse>().ReverseMap();
            CreateMap<GetAssessmentQuestionDTO, AssessmentQuestionResponse>().ReverseMap();
            CreateMap<GetUserAssessmentDetailsDTO, UserAssessmentDetailResponse>().ReverseMap();
            CreateMap<QuestionCreatedNotification, Question>().ReverseMap();
            CreateMap<UserAssessmentCreatedNotification, UserAssessment>().ReverseMap();
            CreateMap<UserCreatedNotification, User>().ReverseMap();
            CreateMap<UserResultCreatedNotification, UserResult>().ReverseMap();

        }
    }
}
