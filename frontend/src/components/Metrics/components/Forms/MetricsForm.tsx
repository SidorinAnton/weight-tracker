import { Button, Form, InputNumber } from "antd";
import React, { FC } from "react";

interface Props {
  closeModal: () => void;
}

export const MetricsForm: FC<Props> = ({ closeModal }) => {
  const onFinish = (values: any) => {
    console.log(values);
    closeModal();
  };
  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 12 },
  };

  return (
    <Form {...layout} name="metrics-form" onFinish={onFinish}>
      <Form.Item
        name="weight"
        label="Вес"
        rules={[{ type: "number", min: 0, max: 500 }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name="waist_circumference"
        label="Обхват талии"
        rules={[{ type: "number", min: 0, max: 500 }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};
