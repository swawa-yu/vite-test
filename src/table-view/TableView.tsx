import React, { useState } from 'react';

import './SyllabusTable.css';
// import { maxNumberOfSubjectsToShow } from '../table-view';
// import { SearchOptions } from '../search';
import SyllabusTableRaw from './SyllabusTableRaw';
import SyllabusTable from './SyllabusTable';
import {
    subjectMap,
    // propertyToShowList,
} from '../subject';

import { SearchOptions, filteredSubjectCodeList } from '../search';

interface TableViewProps {
    searchOptions: SearchOptions;
    bookmarkedSubjects: Set<string>;
    handleBookmarkToggle: (lectureCode: string) => void;
}


function TableView({ searchOptions, bookmarkedSubjects, handleBookmarkToggle }: TableViewProps) {

    const [isTableRaw, setIsTableRaw] = useState(true);

    const defaultMaxNumberOfSubjectsToShow = 100;
    const [maxNumberOfSubjectsToShow, setMaxNumberOfSubjectsToShow] = useState(defaultMaxNumberOfSubjectsToShow);
    const handleMaxSubjectsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setMaxNumberOfSubjectsToShow(isNaN(value) ? 100 : value);
    };

    const filteredSubjects = React.useMemo(() => {
        return filteredSubjectCodeList(searchOptions)
            .map(subjectCode => subjectMap[subjectCode])
    }, [searchOptions]);
    const subjectsToShow = React.useMemo(() => {
        return filteredSubjects.slice(0, maxNumberOfSubjectsToShow);
    }, [searchOptions, maxNumberOfSubjectsToShow]);

    return (
        <div>
            <div className='table-wrapper'>該当授業数: {filteredSubjects.length}</div> {/* 行数を表示 */}
            <div className='table-wrapper'>表示数: {subjectsToShow.length} (/{<div className='table-wrapper'>
                <label htmlFor="max-subjects">最大表示数: </label>
                <input
                    id="max-subjects"
                    type="number"
                    value={maxNumberOfSubjectsToShow}
                    onChange={handleMaxSubjectsChange}
                    min="1" // 最小値を設定
                    max="10000" // 理論上の最大値を設定
                />
            </div>})</div> {/* 行数を表示 */}
            <button onClick={() => setIsTableRaw(!isTableRaw)}>
                {isTableRaw ? "見やすい表に切り替える" : "基本データ表に切り替える"}
            </button>
            {isTableRaw ?
                <SyllabusTableRaw subjectsToShow={subjectsToShow} ></SyllabusTableRaw> :
                <SyllabusTable subjectsToShow={subjectsToShow} bookmarkedSubjects={bookmarkedSubjects} handleBookmarkToggle={handleBookmarkToggle}></SyllabusTable>}
        </div>
    );
}

export default TableView;