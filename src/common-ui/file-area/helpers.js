export const canDrag = () => false;
export const canDrop = ({node}) => !node.isDirectory;
export const generateNodeProps = node => node;
export const cloneValue = data => ({ id: data.id, title: data.title });
