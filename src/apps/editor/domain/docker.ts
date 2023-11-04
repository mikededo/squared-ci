export type DockerResponse = {
  page_size: number;
  next: string;
  previous: string;
  page: number;
  count: number;
  summaries: Summary[];
};

export type Summary = {
  id: string;
  name: string;
  slug: string;
  type: string;
  publisher: { id: string; name: string };
  created_at: string;
  updated_at: string;
  short_description: string;
  source: string;
  extension_reviewed: boolean;
  popularity: number;
  operating_systems: Array<{ name: string; label: string }>;
  architectures: Array<{ name: string; label: string }>;
  logo_url: { large: string; small: string };
  certification_status: string;
  star_count: number;
  pull_count: string;
  filter_type: string;
};

export const DOCKER_CREATE_VARIABLES = {
  '--add-host': '--add-host',
  '--attach': '--attach',
  '--blkio-weight': '--blkio-weight',
  '--blkio-weight-device': '--blkio-weight-device',
  '--cap-add': '--cap-add',
  '--cap-drop': '--cap-drop',
  '--cgroup-parent': '--cgroup-parent',
  '--cidfile': '--cidfile',
  '--cpu-period': '--cpu-period',
  '--cpu-quota': '--cpu-quota',
  '--cpu-rt-period': '--cpu-rt-period',
  '--cpu-rt-runtime': '--cpu-rt-runtime',
  '--cpu-shares': '--cpu-shares',
  '--cpus': '--cpus',
  '--cpuset-cpus': '--cpuset-cpus',
  '--cpuset-mems': '--cpuset-mems',
  '--device': '--device',
  '--device-read-bps': '--device-read-bps',
  '--device-read-iops': '--device-read-iops',
  '--device-write-bps': '--device-write-bps',
  '--device-write-iops': '--device-write-iops',
  '--disable-content-trust': '--disable-content-trust',
  '--dns': '--dns',
  '--dns-option': '--dns-option',
  '--dns-search': '--dns-search',
  '--env': '--env',
  '--env-file': '--env-file',
  '--expose': '--expose',
  '--group-add': '--group-add',
  '--hostname': '--hostname',
  '--interactive': '--interactive',
  '--ip': '--ip',
  '--ip6': '--ip6',
  '--ipc': '--ipc',
  '--isolation': '--isolation',
  '--label': '--label',
  '--label-file': '--label-file',
  '--link': '--link',
  '--link-local-ip': '--link-local-ip',
  '--log-driver': '--log-driver',
  '--log-opt': '--log-opt',
  '--mac-address': '--mac-address',
  '--memory': '--memory',
  '--memory-reservation': '--memory-reservation',
  '--memory-swap': '--memory-swap',
  '--memory-swappiness': '--memory-swappiness',
  '--name': '--name',
  '--network-alias': '--network-alias',
  '--no-healthcheck': '--no-healthcheck',
  '--oom-kill-disable': '--oom-kill-disable',
  '--oom-score-adj': '--oom-score-adj',
  '--pid': '--pid',
  '--pids-limit': '--pids-limit',
  '--privileged': '--privileged',
  '--publish': '--publish',
  '--read-only': '--read-only',
  '--restart': '--restart',
  '--runtime': '--runtime',
  '--security-opt': '--security-opt',
  '--shm-size': '--shm-size',
  '--stop-signal': '--stop-signal',
  '--stop-timeout': '--stop-timeout',
  '--storage-opt': '--storage-opt',
  '--sysctl': '--sysctl',
  '--tmpfs': '--tmpfs',
  '--tty': '--tty',
  '--ulimit': '--ulimit',
  '--user': '--user',
  '--userns': '--userns',
  '--uts': '--uts',
  '--volume': '--volume',
  '--volume-driver': '--volume-driver',
  '--volumes-from': '--volumes-from',
  '--workdir': '--workdir',
  '-c': '-c',
  '-e': '-e',
  '-h': '-h',
  '-i': '-i',
  '-l': '-l',
  '-m': '-m',
  '-p': '-p',
  '-t': '-t',
  '-u': '-u',
  '-v': '-v',
  '-w': '-w',
};
