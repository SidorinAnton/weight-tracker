import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import React, { FC } from "react";
import { toBackendDate } from "../../../../utils/time";
import locale from "antd/es/date-picker/locale/ru_RU";
import { ApiPostUserGoals, IUserGoals } from "../../../../api/userGoals";

interface Props {
  closeModal: () => void;
  setGoals: React.Dispatch<React.SetStateAction<IUserGoals[] | null>>;
}

export const GoalsForm: FC<Props> = ({ closeModal, setGoals }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const { weight: weight_goal, goalType: goal_type, date } = values;
    const res = await ApiPostUserGoals({
      weight_goal,
      goal_type,
      target_date: toBackendDate(date),
    });
    setGoals((prevState) => {
      if (prevState) {
        return [...prevState, res];
      }
      return [res];
    });
    form.resetFields();
    closeModal();
  };

  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 12 },
  };

  return (
    <Form {...layout} form={form} name="goals-form" onFinish={onFinish}>
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
        name="goalType"
        label="Статус"
        rules={[{ required: true, message: "Это поле обязательно" }]}
      >
        <Select
          options={[
            {
              value: "local",
              label: "Локальная цель",
            },
            {
              value: "global",
              label: "Глобальная цель",
            },
          ]}
        />
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
