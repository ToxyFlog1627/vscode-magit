import {FunctionComponent, ReactNode, useState} from "react";
import styled from "styled-components";
import Caret from "./Caret";
import useSelectable from "../hooks/useSelectable";

const Container = styled.div<{indented: boolean}>`
	position: relative;
	${({indented}) => indented && "margin-left: 14px; margin-bottom: 3px;"}
`;

const Title = styled.p<{highlightTitle: boolean}>`
	${({highlightTitle}) => highlightTitle && "color: var(--vscode-editorLink-activeForeground); font-weight: bolder;"}
`;

const Content = styled.div`
	display: flex;
	flex-direction: row;
`;

type Props = {
	title: string;
	children?: ReactNode;
	isOpened?: boolean;
	section?: boolean;
};

const Group: FunctionComponent<Props> = ({title, children, isOpened: _isOpened = true, section = false}) => {
	const toggleOpened = () => setIsOpened(!isOpened);

	const selectable = useSelectable({"Enter": toggleOpened, " ": toggleOpened});
	const [isOpened, setIsOpened] = useState(_isOpened);

	return (
		<Container indented={section}>
			<Caret setOpened={setIsOpened} opened={isOpened} />
			<Title onClick={toggleOpened} highlightTitle={section} ref={selectable}>
				{title}
			</Title>
			{isOpened && <Content>{children}</Content>}
		</Container>
	);
};

export default Group;
