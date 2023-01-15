import { Alert, Button, Form, Input } from "antd";
import React, { FC, useState } from "react";
import { ApiLogin } from "../../api/enrypoint";
import "./Auth.css";

interface Props {
  login: () => void;
}

export const Auth: FC<Props> = ({ login }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const onFinish = async (values: any) => {
    const resp = await ApiLogin(values);
    if (resp) {
      setErrors(resp.non_field_error);
    } else {
      login();
    }
  };

  return (
    <section className="auth">
      {errors?.length > 0 &&
        errors.map((error) => (
          <Alert
            key={error}
            message="Ошибка"
            description={error}
            type="error"
            showIcon
            className="auth__alert"
          />
        ))}
      <Form
        name="auth-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 6 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Логин"
          name="username"
          rules={[{ required: true, message: "Это поле обязательно" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Это поле обязательно" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 6 }}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};
