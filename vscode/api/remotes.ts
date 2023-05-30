import exec from '../exec';

export const upstreamRemote = async () => {
	const { data, error, errorMessage } = await exec('git rev-parse --abbrev-ref --symbolic-full-name @{u}');
	if (error) {
		if (errorMessage.startsWith('fatal: no upstream configured for branch')) return { data: null };
		return { error: true };
	}

	return { data: data.replace(/\s+$/, '') };
};

export const remotes = async () => {
	const { data, error } = await exec('git remote -v');
	if (error) return { error: true };

	const pushRemotes = data.split('\n').filter(line => line.endsWith('(push)'));
	const remotes = pushRemotes.map(remote => remote.split('  ')[0]);
	return { data: remotes };
};

export const remotesWithBranches = async () => {
	const { data, error } = await exec('git branch -a');
	if (error) return { error: true };

	const branches = data.split('\n');
	const remotes = branches
		.map(remote => remote.slice(2))
		.filter(remote => remote.startsWith('remotes/'))
		.map(remote => remote.slice(8));
	return { data: remotes };
};

export const remoteUrl = async (remote: null | string) => {
	if (remote === null) return { data: null };
	const { data, error } = await exec(`git remote get-url ${remote}`);
	if (error) return { error: true };
	return { data };
};

export const createRemote = async ({ name, url }: { name: string; url: string }) => {
	const { error } = await exec(`git remote add ${name} ${url}`);
	if (error) return { error: true };
	return { data: null };
};

export const renameRemote = async ({ from, to }: { from: string; to: string }) => {
	const { error } = await exec(`git remote rename ${from} ${to}`);
	if (error) return { error: true };
	return { data: null };
};

export const setRemoteUrl = async ({ name, url }: { name: string; url: string }) => {
	const { error } = await exec(`git remote set-url ${name} ${url}`);
	if (error) return { error: true };
	return { data: null };
};

export const push = async ({ remote, branch, setUpstream }: { remote: string; branch: string; setUpstream: boolean }) => {
	const { data, error, errorMessage } = await exec(`git push ${setUpstream ? '-u' : ''} ${remote} ${branch}`);
	return { data: error ? data : errorMessage };
};

export const pull = async (remote: string) => {
	const { error } = await exec(`git pull ${remote}`);
	if (error) return { error: true };
	return { data: null };
};