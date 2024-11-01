export function keyPressToCommandString(key: KeyboardEvent): string {
  let modifiers = '';
  if (key.ctrlKey) modifiers += 'ctrl+';
  if (key.metaKey) modifiers += 'meta+';
  if (key.altKey) modifiers += 'alt+';
  if (key.shiftKey) modifiers += 'shift+';

  const metaKeys = ['Control', 'Meta', 'Alt', 'Shift'];
  // Check if the pressed key is not a meta key
  if (!metaKeys.includes(key.key)) {
    return `${modifiers}${key.key}`;
  }

  return modifiers.slice(0, -1); // Remove the trailing '+'
}

const modifiersToEvent: Record<
  'ctrl' | 'meta' | 'alt' | 'shift',
  keyof KeyboardMetaInfo
> = {
  alt: 'altKey',
  ctrl: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey',
};

type KeyboardMetaInfo = Pick<
  KeyboardEventInit,
  'ctrlKey' | 'metaKey' | 'shiftKey' | 'altKey'
>;

export function commandStringToKeyPress(command: string) {
  const modifiers = command.split('+') as ('ctrl' | 'meta' | 'alt' | 'shift')[];
  const key = modifiers.pop();
  if (key === undefined) return;
  const metaKeys = ['Control', 'Meta', 'Alt', 'Shift'];
  const options: KeyboardMetaInfo = {};
  for (const modifier of modifiers) {
    if (!modifiersToEvent[modifier]) continue;
    options[modifiersToEvent[modifier]] = true;
  }

  let keyPress: KeyboardEvent;

  return keyPress;
}
