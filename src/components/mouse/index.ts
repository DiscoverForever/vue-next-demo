import {
  onMounted, onUnmounted, reactive, toRefs,
} from 'vue';

export default function useMouse() {
  const position = reactive({
    x: 0,
    y: 0,
  });

  function onMouseMove(mouseEvent: MouseEvent) {
    position.x = mouseEvent.clientX;
    position.y = mouseEvent.clientY;
  }

  onMounted(() => document.addEventListener('mousemove', onMouseMove));

  onUnmounted(() => document.removeEventListener('mousemove', onMouseMove));

  return toRefs(position);
}
