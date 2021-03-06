import React from "react";
import {connect} from "react-redux";

class QuestionBlock extends React.Component {
    componentDidMount() {
        this.props.setQuestionComponentWithFilterID();
    }

    render() {
        const {currentQuestionComponent} = this.props;
        return (
            (currentQuestionComponent === null) ? <div>Wählen Sie mindestens ein Typ der Aufgabe!</div> : currentQuestionComponent
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentQuestionComponent: state.currentQuestionComponent
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setQuestionComponentWithFilterID: () => {
            dispatch({type: "SET_QUESTION_COMPONENT_WITH_FILTER_ID"});
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBlock);
/*
    -Общий компонент QuestionBlock
    -QB занимается случайным выбором типа следующей задачи исходя из фильтра
    -При помощи Switch отображает нужный компонент для типа задачи
    -Компонент выбирает рандомно один из вопросов из массива
    -Создаём еще один общий компонент для поля вопрос, так как вопрос всегда текстовый
    -Компонент с вопросом возвращается в render() с props текста вопроса
    -Сам компонент с задачей генерирует варианты ответов и шаблон и действует в зависимости от логики
    -Как только вопрос окончен (неправильный ответ, пропуск вопроса и тд) компонент отправляет запрос наверх в QB, чтобы тот сгенерировал новую тему и перерисовал компоненты
 */
