// webServer_cpp.cpp : �ܼ� ���� ���α׷��� ���� �������� �����մϴ�.
//

#include "stdafx.h"
#include <stdio.h>
#include <WinSock2.h>
#include <string>
#include <sstream>
#include <iostream>
#include <windows.h>
#include <vector>
#include <exception>
#include <string.h>
#include <array>

#pragma comment(lib, "ws2_32.lib")

#define MAX_BUFF 2048
#define STR_BUFF 64
#define REQ_WINSOCK_VER 2

int init(WSADATA wsaData);
SOCKET makeBaseSocket(SOCKET serverSocket);
DWORD WINAPI processSocket(LPVOID param);
void inBufAnalyzer(char szInBuf[], char midBuffer1[], char midBuffer2[], char midBuffer3[], char midBuffer4[]);
//std::string httpReturn( std::string szBuf, char szInBuf[] );
std::vector<std::string> stringSplit(std::string& str, std::string separators );


typedef struct 
{
	char* ext;
	char* mediatype;
}extn;

//							0					1					2					3					4					5
//							6					7					8
extn extensions[] ={{"gif","image/gif"},{"jpg","image/jpg"},{"jpeg","image/jpeg"},{"png","image/png"},{"bmp","image/bmp"},{"ico","image/ico"},
					{"txt","text/plain"},{"htm","text/html"},{"html","text/html"}};

int _tmain(int argc, _TCHAR* argv[])
{
	WSADATA wsaData;
	SOCKET serverSocket;
	SOCKET replySocket;

	int length;

	struct sockaddr_in addrSockClient;
	//sockaddr_in(16����Ʈ) - ipv4
	//family address 2����Ʈ
	//��Ʈ ��ȣ 2����Ʈ
	//ip �ּ� 4����Ʈ(32��Ʈ)

	//�޸� �ʱ�ȭ ����
	memset( &addrSockClient, 0, sizeof(sockaddr_in) );
	memset( &serverSocket, 0, sizeof(SOCKET) );
	memset( &wsaData, 0 , sizeof(wsaData) );
	
	//wsaData Ȱ��ȭ
	init( wsaData );
	//�⺻ ���� ����
	serverSocket = makeBaseSocket(serverSocket);

	while (true)
	{
		length = sizeof(addrSockClient);
		replySocket = accept(serverSocket, (struct sockaddr*)&addrSockClient, &length);
		if( replySocket == INVALID_SOCKET )
		{
			printf_s("Accept Error No : %d", WSAGetLastError());
			return 1;
		}

		DWORD dwThreadID;
		HANDLE hThread;

		hThread = CreateThread(NULL, 0, processSocket, (LPVOID)replySocket, 0, &dwThreadID);

		CloseHandle(hThread);
	}


	//����� wsa�� �ٽ� ���� ȣ��
	//wsastartup ȣ�� �� ��ŭ ȣ�� �Ǿ�� ��(���� 1ȸ, ���� 1ȸ)
	WSACleanup();

	return 0;
}

DWORD WINAPI processSocket(LPVOID param)
{
	SOCKET replySocket = (SOCKET)param;

	char szMidBuf1[STR_BUFF]={0,};
	char szMidBuf2[STR_BUFF]={0,};
	char szMidBuf3[STR_BUFF]={0,};
	char szMidBuf4[STR_BUFF]={0,};
	char szInBuf[MAX_BUFF]={0,};

	memset( szInBuf, 0 , sizeof(szInBuf) );

	recv(replySocket, szInBuf, sizeof(szInBuf), 0);
	inBufAnalyzer(szInBuf,szMidBuf1, szMidBuf2, szMidBuf3, szMidBuf4);
	std::cout<<"\n"<<"��"<<"\n\n"<<szMidBuf1<<"\n"<<szMidBuf2<<"\n"<<szMidBuf3<<"\n"<<szMidBuf4<<"\n"<<std::endl;

	//////////////////////////////////////////////////////////////////////////
	//index.html�� �̵�
	int urlLen = strlen(szMidBuf2);
	if (szMidBuf2[urlLen -1] == '/')
	{
		strcat_s(szMidBuf2,STR_BUFF,"index.html");
	}


	//////////////////////////////////////////////////////////////////////////
	//���� �ҷ����� �������� api Ȱ��
	HANDLE hFile = CreateFileA(szMidBuf2, GENERIC_READ, FILE_SHARE_READ, 0, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, 0);

	int returnCode = 0;
	char* errMessege = nullptr;
	int mediaType = -1;

	DWORD fileSizeHigh;
	DWORD fileSizeLow;

	char* fileDataBuffer;

	if (hFile != INVALID_HANDLE_VALUE)
	{
		fileSizeLow = GetFileSize(hFile, &fileSizeHigh);
		std::cout<<fileSizeLow<<std::endl;

		fileDataBuffer = (char*)malloc(fileSizeLow);

		DWORD numOfByteRead = 0;
		ReadFile(hFile, fileDataBuffer, fileSizeLow, &numOfByteRead, NULL);

		CloseHandle(hFile);
		//////////////////////////////////////////////////////////////////////////
		//std::cout<<fileDataBuffer<<std::endl;

		for (int i = 0; i < 9; ++i)
		{
			if ( strcmp(szMidBuf3, extensions[i].ext) == 0 )
				mediaType = i;
		}

		returnCode = 200;
		errMessege = "OK";
	}
	else
	{
		returnCode = 404;
		errMessege = "Not Found";
	}

	//////////////////////////////////////////////////////////////////////////
	//��� ��
	char replyBuffer[MAX_BUFF]={0,};
	char filesSize[STR_BUFF]={0,};

	sprintf_s(filesSize,STR_BUFF,"%d",fileSizeLow);

	sprintf_s(replyBuffer,MAX_BUFF,"HTTP/1.1 %d %s", returnCode, errMessege);// ���� ����


	if (returnCode == 200)
	{
		if (mediaType>=0)
		{
			strcat_s(replyBuffer,MAX_BUFF,"\r\nContent-Type:");
			strcat_s(replyBuffer,MAX_BUFF,extensions[mediaType].mediatype);
			if (mediaType > 5)
			{
				strcat_s(replyBuffer,MAX_BUFF,";charset=UTF-8");
			}
		}
		strcat_s(replyBuffer,MAX_BUFF,"\r\nContent-Length:");
		strcat_s(replyBuffer,MAX_BUFF,filesSize);
	}
	strcat_s(replyBuffer,MAX_BUFF,"\r\n\r\n");

	if (returnCode == 200)
	{
		printf_s("%s",replyBuffer);
		send(replySocket, fileDataBuffer, fileSizeLow,0);
		int postLength = strlen(szMidBuf4);
		send(replySocket, szMidBuf4, postLength,0);
	}

	closesocket(replySocket);

	return 0;

}

//������ ���� ���� �ʿ��� �Լ�
//winsock.dll ����� ���� �Լ�
int init( WSADATA wsaData )
{
	int err;

	err = WSAStartup(MAKEWORD(REQ_WINSOCK_VER,0), &wsaData);

	if( err != 0 )
	{
		printf_s("WSAStartup failed with error: %d \n", err);
		return 1;
	}
	else
	{
		printf_s("WSAStartup OK \n");
	}

	return 0;
}
std::vector<std::string> stringSplit(std::string& str, std::string separators )
{
	size_t n = str.length();
	size_t start, stop;
	std::vector<std::string> result;
	start = str.find_first_not_of(separators);

	while ((start >= 0) && (start < n)) {
		stop = str.find_first_of(separators, start);
		if ((stop < 0) || (stop > n)) stop = n;
		result.push_back(str.substr(start, stop - (start)));
		start = str.find_first_not_of(separators, stop);
	}
	return result;
}
SOCKET makeBaseSocket( SOCKET serverSocket)
{
	int err = 0;
	struct sockaddr_in addrSockServer;
	BOOL bValid = 1;

	//�⺻ ���� ����
	serverSocket = socket(AF_INET, SOCK_STREAM, 0);
	if(serverSocket == INVALID_SOCKET)
	{
		printf_s("socket error No: %d", WSAGetLastError());
		exit(-1);
	}
	else
	{
		printf_s("Create Socket OK \n");
	}


	//���� ����
	addrSockServer.sin_family = AF_INET; //ipv4
	addrSockServer.sin_port = htons(8080);
	addrSockServer.sin_addr.S_un.S_addr = INADDR_ANY; //�ʱ�ȭ ����

	err = setsockopt(serverSocket, SOL_SOCKET, SO_REUSEADDR,(const char*)&bValid, sizeof(bValid));
	//�ۼ��� ������ ũ������, ��ε� ĳ���� ���, ���Ῡ�� Ȯ�� ��
	//IP��� ���Կ��� ����, IP��Ŷ�� TTL �� ����, Nagle �˰��� on/off
	//�̹� ���� �ּҸ� ���� �ϵ��� �Ѵ�.
	if( err != 0 )
	{
		printf_s("socket setting error No : %d\n", WSAGetLastError());
		exit(-1);
	}


	//binding
	err = bind( serverSocket,(struct sockaddr*)&addrSockServer, sizeof(addrSockServer) );
	if( err != 0 )
	{
		printf_s("Bind error No : %d \n", WSAGetLastError());
		exit(-1);
	}

	//listen
	err = listen(serverSocket, SOMAXCONN);
	if ( err != 0 )
	{
		printf_s("Listen error No : %d \n", WSAGetLastError());
		exit(-1);
	}
	else
	{
		printf_s("now listen \n\n");
	}

	return serverSocket;
}

void inBufAnalyzer(char szInBuf[], char midBuffer1[], char midBuffer2[], char midBuffer3[], char midBuffer4[])
{
	std::string fullSentence;
	fullSentence = szInBuf;
	std::string separators = " ";

	//���� ���� ���
	std::cout<<szInBuf<<std::endl;

	//���� ���� ���� ����
	std::vector<std::string> splitedBuf;
	std::vector<std::string> splitedPostBuf;

	splitedBuf.clear();
	splitedBuf = stringSplit(fullSentence, separators);
	//Get, Post �м�
	std::string method = splitedBuf[0];
	//std::cout<<method<<std::endl;
	strcpy_s(midBuffer1, STR_BUFF, method.c_str());
	//std::cout<<midBuffer1<<std::endl;
	
	//post data backup
	if (method == "POST")
	{
		std::string dataBlob = splitedBuf[23];
		separators = "\r\n";
		splitedPostBuf = stringSplit(dataBlob, separators);
		dataBlob = splitedPostBuf[1];
		strcpy_s(midBuffer4, STR_BUFF, dataBlob.c_str());

		//std::cout<<midBuffer4<<std::endl;
	}

	//uri�κ� �м��ϱ�
	std::string receivedUrl = "." + splitedBuf[1];
	//std::cout<<receivedUrl<<std::endl;
	strcpy_s(midBuffer2,STR_BUFF,receivedUrl.c_str());
	//std::cout<<pipeBuffer[0]<<std::endl;

	//extension �м�
	std::string extension;
	separators = ".";
	splitedBuf = stringSplit(receivedUrl, separators);
	//std::cout<<splitedBuf.back()<<std::endl;
	strcpy_s(midBuffer3,STR_BUFF,splitedBuf.back().c_str());
	//std::cout<<pipeBuffer[1]<<std::endl;
}