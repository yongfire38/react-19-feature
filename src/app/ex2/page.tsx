"use client";

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

// 비동기 데이터 페칭을 시뮬레이션하는 함수
const fetchItems = async (count: number): Promise<string[]> => {
  // 2초 지연을 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 2000));
  return Array.from({ length: count }, (_, i) => `Async Item ${i + 1}`);
};

export default function Example2() {
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");

  const handleAddItem = async () => {
    try {
      startTransition(async () => {
        // 비동기 데이터 페칭
        const newItems = await fetchItems(100);
        setList(prevList => [...prevList, ...newItems]);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleReset = () => {
    setList([]);
    setError("");
  };

  return (
    <div className={styles.container}>

      <h1>비동기에서의 useTransition 사용</h1>
      <p>React 19.0.0 이상에서의 useTransition 사용</p>
      <p>React 19.0.0 이상에서는 비동기 작업에서도 useTransition을 사용 가능하다</p>

      <br />

      <p>`비동기 데이터 추가` 버튼을 누르면 2초 지연 후 데이터가 추가되며</p>
      <p> isPending이 true인 동안에는 메시지 컴포넌트 표시 및 버튼 문구의 변경이 수행된다</p>

      <br />

      <div className={styles.buttonContainer}>
        <button 
          onClick={handleAddItem}
          disabled={isPending}
          className={styles.button}
        >
          {isPending ? "데이터 로딩 중..." : "비동기 데이터 추가"}
        </button>
        <button onClick={handleReset} className={styles.button}>
          초기화
        </button>
        <Link href="/" className={styles.homeLink}>
          메인으로
        </Link>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          Error: {error}
        </div>
      )}

      <div className={styles.listContainer}>
        <h3>아이템 목록 ({list.length}개)</h3>
        {isPending && (
          <div className={styles.loadingMessage}>
            새로운 데이터를 불러오는 중...
          </div>
        )}
        <ul className={styles.list}>
          {list.map((item, index) => (
            <li key={index} className={styles.listItem}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}