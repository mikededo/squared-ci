export type Container = {
  image: string;
  credentials: { name: string; password: string };
  env: Map<string, string>;
  ports: Set<string>;
  volumes: Set<string>;
  options: Set<string>;
};
