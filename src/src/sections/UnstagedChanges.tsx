import {FunctionComponent} from "react";
import Changes from "../components/Changes";
import useFetch from "../hooks/useFetch";

type Props = {};

const UnstagedChanges: FunctionComponent<Props> = ({}) => {
	const [changes] = useFetch<[string, string, string[][]][]>("GET_UNSTAGED_CHANGES");
	if (changes === null) return null;

	return <Changes title="Unstaged changes" changes={changes} />;
};

export default UnstagedChanges;