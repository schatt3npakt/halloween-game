import { ref, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";

export function useInputMethod() {
  enum InputMethod {
    KEYBOARD = "keyboard",
    GAMEPAD = "gamepad",
    TOUCH = "touch",
    POINTER = "pointer",
  }

  const inputMethod: Ref<InputMethod> = ref(InputMethod.POINTER);

  function setInputMethod(method: InputMethod) {
    inputMethod.value = method;
  }

  function handleKeyboardInput() {
    setInputMethod(InputMethod.KEYBOARD);
  }

  function handleGamepadInput() {
    setInputMethod(InputMethod.GAMEPAD);
  }

  function handleTouchInput() {
    setInputMethod(InputMethod.TOUCH);
  }

  function handlePointerInput() {
    setInputMethod(InputMethod.POINTER);
  }

  onMounted(() => {
    window.addEventListener("keydown", handleKeyboardInput);
    window.addEventListener("gamepadconnected", handleGamepadInput);
    window.addEventListener("touchstart", handleTouchInput);
    window.addEventListener("pointerdown", handlePointerInput);
    window.addEventListener("mousemove", handlePointerInput);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyboardInput);
    window.removeEventListener("gamepadconnected", handleGamepadInput);
    window.removeEventListener("touchstart", handleTouchInput);
    window.removeEventListener("pointerdown", handlePointerInput);
    window.removeEventListener("mousemove", handlePointerInput);
  });

  return {
    inputMethod,
  };
}
