import "element-plus/dist/index.css";

import { createTestingPinia } from "@pinia/testing";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { waitFor } from "@testing-library/vue"; // твой компонент
import { flushPromises, mount } from "@vue/test-utils";
import ElementPlus from "element-plus";
import { nextTick } from "vue";

import { useEventEditor } from "@/modules/EventCalendar/composables/useEventEditor";
import EventDrawerForm from "@/modules/EventCalendar/components/EventEditor.vue";

const mockCalendar = createEventsServicePlugin();

describe("EventDrawerForm", () => {
  const mountForm = () => {
    const pinia = createTestingPinia({ stubActions: false });
    const eventEditor = useEventEditor(mockCalendar);

    return mount(EventDrawerForm, {
      global: {
        plugins: [pinia, ElementPlus],
        provide: {
          eventEditor,
          drawer: { visible: { value: true }, setDrawerVisible: vi.fn() },
        },
      },
    });
  };

  it("показывает ошибки при пустых полях", async () => {
    const wrapper = mountForm();
    await flushPromises();

    await wrapper.find("button.el-button.el-button--primary").trigger("click");
    await flushPromises();
    await nextTick();
    await nextTick();

    const errorMessages = wrapper.findAll("el-form-item__error").map((node) => node.text());

    expect(errorMessages).toContain("Пожалуйста, заполните поле");
    expect(errorMessages).toContain("Выберите время начала");
    expect(errorMessages).toContain("Выберите время окончания");

    await waitFor(() => {
      expect(wrapper.text()).toContain("Пожалуйста, заполните поле");
      expect(wrapper.html()).toContain("Выберите время начала");
      expect(wrapper.html()).toContain("Выберите время окончания");
    });
  });

  it("валидирует длину заголовка", async () => {
    const wrapper = mountForm();
    await nextTick();
    await flushPromises();

    const input = wrapper.find("input");
    await input.setValue("A");
    await wrapper.find("button.el-button--primary").trigger("click");
    await flushPromises();

    expect(wrapper.html()).toContain("Длина поля должна быть от 3 до 16 символов");
  });

  it("валидирует время (start > end)", async () => {
    const wrapper = mountForm();
    await wrapper.find("input[placeholder=\"HH:mm\"]").setValue("20:00");
    await wrapper.findAll("input[placeholder=\"HH:mm\"]")[1].setValue("18:00");
    await wrapper.find("button.el-button--primary").trigger("click");
    await nextTick();

    expect(wrapper.html()).toContain("Время начала должно быть раньше времени окончания");
  });

  it("вызывает save при корректных данных", async () => {
    const wrapper = mountForm();
    const eventEditor = wrapper.vm.eventEditor;

    const saveSpy = vi.spyOn(eventEditor, "save");

    await wrapper.find("input").setValue("Правильный заголовок");
    const timeInputs = wrapper.findAll("input[placeholder=\"HH:mm\"]");
    await timeInputs[0].setValue("10:00");
    await timeInputs[1].setValue("12:00");

    await wrapper.find("button.el-button--primary").trigger("click");
    await nextTick();

    expect(saveSpy).toHaveBeenCalled();
  });
});
