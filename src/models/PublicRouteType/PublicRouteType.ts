
export type PublicRouteType = {
  path: string;
  component: () => React.ReactNode;
  layout?: React.ComponentType<any> | null;
}