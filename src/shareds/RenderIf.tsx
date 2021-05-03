import React from 'react';

export default function RenderIf(props: {condition: boolean; children?: any}) {
  if (props.condition) return props.children || null;
  return null;
}
