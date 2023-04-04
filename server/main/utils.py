from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        if 'title' in response.data.keys():
            if response.data['title'][0] == 'course с таким title уже существует.':
                response.data.pop('title')
                response.data['error'] = 'Курс с таким названием уже существует'
        if 'non_field_errors' in response.data.keys():
            if response.data['non_field_errors'][0] == 'Невозможно войти с предоставленными учетными данными.':
                response.data.pop('non_field_errors')
                response.data['error'] = 'Неправильный логин или пароль'
        response.data['status_code'] = response.status_code

    return response
