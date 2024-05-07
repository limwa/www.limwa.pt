import { For, createSignal, onCleanup, onMount } from "solid-js";

export function InteractiveBackground() {
  const [width, setWidth] = createSignal(document.body.clientWidth);
  const [height, setHeight] = createSignal(document.body.clientHeight);

  const [pointerX, setPointerX] = createSignal<number | null>(null);
  const [pointerY, setPointerY] = createSignal<number | null>(null);

  onMount(() => {
    const controller = new AbortController();

    window.addEventListener(
      "resize",
      () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      },
      {
        signal: controller.signal,
      }
    );

    document.addEventListener(
      "pointermove",
      (ev) => {
        setPointerX(ev.clientX);
        setPointerY(ev.clientY);
      },
      {
        signal: controller.signal,
      }
    );

    document.addEventListener(
      "pointerleave",
      (ev) => {
        setPointerX(null);
        setPointerY(null);
      },
      {
        signal: controller.signal,
      }
    );

    onCleanup(() => controller.abort());
  });

  const cols = Math.floor(width() / 16);
  const rows = Math.floor(height() / 16) + 1;

  return (
    <div class="absolute inset-0 -z-10 opacity-10">
      <p class="text-white">{pointerX} - {pointerY}</p>
      <div class="grid" style={{ "grid-template-columns": `repeat(${cols}, 1fr)` }}>
        <For each={new Array(rows * cols).fill(0)}>
          {(child, index) => {
            const row = Math.floor(index() / cols);
            const col = index() % cols;

            return (
              <div class="size-4 flex justify-center items-center" style={{
                top: `${1}`
              }}>
                  <div class="bg-white size-1 rounded-full mx-auto" />
              </div>
            )
            }
          }
        </For>
      </div>
    </div>
  );
}
