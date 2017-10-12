export default function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}
