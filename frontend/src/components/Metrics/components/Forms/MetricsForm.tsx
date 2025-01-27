import { Button, DatePicker, Form, InputNumber } from "antd";
import React, { FC } from "react";
import { ApiPostUserMetrics, IUserMetrics } from "../../../../api/userMetrics";
import { toBackendDate } from "../../../../utils/time";
import locale from "antd/es/date-picker/locale/ru_RU";

interface Props {
  closeModal: () => void;
  setMetrics: React.Dispatch<React.SetStateAction<IUserMetrics[] | null>>;
}

export const MetricsForm: FC<Props> = ({ closeModal, setMetrics }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const { weight, waistCircumference: waist_circumference, date } = values;
    const res = await ApiPostUserMetrics({
      weight,
      waist_circumference,
      measurement_date: toBackendDate(date),
    });
    setMetrics((prevState) => {
      if (prevState) {
        return [...prevState, res];
      }
      return [res];
    });
    form.resetFields();
    closeModal();
  };

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 12 },
  };

  return (
    <Form {...layout} form={form} name="metrics-form" onFinish={onFinish}>
      <Form.Item
        name="weight"
        label="Вес"
        rules={[
          { required: true, message: "Это поле обязательно" },
          {
            type: "number",
            min: 0,
            max: 500,
            message: "Минимальное значение 0, максимальное 500",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name="waistCircumference"
        label="Обхват талии"
        rules={[{ type: "number", min: 0, max: 500 }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item name="date" label="Дата">
        <DatePicker format="DD-MM-YYYY" locale={locale} />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};
