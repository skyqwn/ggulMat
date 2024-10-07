type UserInfomation = {
  email: string;
  password: string;
};

function validateUser(values: UserInfomation) {
  const errors = {
    email: '',
    password: '',
  };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }
  return errors;
}

function validateLogin(values: UserInfomation) {
  return validateUser(values);
}

function validateSingup(values: UserInfomation & {passwordConfirm: string}) {
  const errors = validateUser(values);
  const signupErrors = {...errors, passwordConfirm: ''};

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }
  return signupErrors;
}

function validateAddPost(value: {title: string; description: string}) {
  const errors = {
    title: '',
    description: '',
  };

  if (value.title.trim() === '') {
    errors.title = '제목을 작성해주세요.';
  }
  if (value.description.trim() === '') {
    errors.description = '설명을 작성해주세요.';
  }

  return errors;
}

export {validateLogin, validateSingup, validateAddPost};
