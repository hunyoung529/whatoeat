import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  // 한 블록에 보여줄 페이지 개수
  const maxPageBlock = 5;

  // 현재 페이지가 속한 블록 인덱스 (0부터 시작)
  const blockIndex = Math.floor((currentPage - 1) / maxPageBlock);

  // 현재 블록의 시작/끝 페이지 번호
  const startPage = blockIndex * maxPageBlock + 1;
  const endPage = Math.min(startPage + maxPageBlock - 1, totalPages);

  // [startPage..endPage]까지의 페이지 번호 배열
  const pageNumbers: number[] = [];
  for (let page = startPage; page <= endPage; page++) {
    pageNumbers.push(page);
  }

  // "이전 블록" 화살표
  const handlePrevBlock = () => {
    // 이미 첫 블록이면 실행X
    if (blockIndex === 0) return;
    // 이전 블록의 마지막 페이지로 이동 (예: 현재 블록 1~5면, 이전 블록은 1~5 이전의 6~10…)
    const prevBlockLastPage = (blockIndex - 1) * maxPageBlock + maxPageBlock;
    onPageChange(prevBlockLastPage);
  };

  // "다음 블록" 화살표
  const handleNextBlock = () => {
    // 마지막 블록 인덱스
    const lastBlockIndex = Math.floor((totalPages - 1) / maxPageBlock);
    // 이미 마지막 블록이면 실행X
    if (blockIndex === lastBlockIndex) return;
    // 다음 블록의 첫 페이지로 이동
    const nextBlockFirstPage = (blockIndex + 1) * maxPageBlock + 1;
    onPageChange(nextBlockFirstPage);
  };

  return (
    <View style={styles.pagination}>
      {/* 이전 블록 화살표 */}
      <TouchableOpacity
        onPress={handlePrevBlock}
        disabled={blockIndex === 0}
        style={[
          styles.arrowButton,
          blockIndex === 0 && styles.disabledArrowButton,
        ]}
      >
        <Text style={styles.arrowText}>{"<"}</Text>
      </TouchableOpacity>

      {/* 현재 블록의 페이지 버튼들 */}
      {pageNumbers.map((page) => (
        <TouchableOpacity
          key={page}
          onPress={() => onPageChange(page)}
          style={[
            styles.pageButton,
            currentPage === page && styles.activePageButton,
          ]}
        >
          <Text
            style={[
              styles.pageText,
              currentPage === page && styles.activePageText,
            ]}
          >
            {page}
          </Text>
        </TouchableOpacity>
      ))}

      {/* 다음 블록 화살표 */}
      <TouchableOpacity
        onPress={handleNextBlock}
        disabled={endPage >= totalPages}
        style={[
          styles.arrowButton,
          endPage >= totalPages && styles.disabledArrowButton,
        ]}
      >
        <Text style={styles.arrowText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  pageButton: {
    marginHorizontal: 4,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  activePageButton: {
    backgroundColor: "#333",
  },
  pageText: {
    fontSize: 14,
    color: "#000",
  },
  activePageText: {
    color: "#fff",
  },
  arrowButton: {
    marginHorizontal: 4,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  disabledArrowButton: {
    opacity: 0.5, // 비활성화 시 시각적 표시
  },
  arrowText: {
    fontSize: 14,
    color: "#000",
  },
});
