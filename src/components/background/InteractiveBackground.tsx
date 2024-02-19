import { For, createSignal, onCleanup, onMount } from "solid-js";

export function InteractiveBackground() {
  const [width, setWidth] = createSignal(document.body.clientWidth);
  const [height, setHeight] = createSignal(document.body.clientHeight);

  onMount(() => {
    const controller = new AbortController();

    window.addEventListener(
      "resize",
      () => {
        setWidth(document.body.clientWidth);
        setHeight(document.body.clientHeight);
      },
      {
        signal: controller.signal,
      }
    );

    onCleanup(() => controller.abort());
  });

  const cols = Math.floor(width() / 16);
  const rows = Math.floor(height() / 16);
//   createEffect(() => console.log(height()));

  return (
    <div class="absolute inset-0 -z-10 opacity-10">
      <div class="grid" style={{ "grid-template-columns": `repeat(${cols}, 1fr)` }}>
        <For each={new Array(rows * cols).fill(0)}>
          {(child) => (
            <div class="size-4 flex justify-center items-center">
                <div class="bg-gradient-to-tr from-red-400 to-blue-400 size-1 rounded-full mx-auto" />
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
