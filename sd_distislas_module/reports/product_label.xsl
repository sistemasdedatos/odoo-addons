<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
	<xsl:variable name="initial_bottom_pos">26.2</xsl:variable>
	<xsl:variable name="initial_left_pos">0.5</xsl:variable>
	<xsl:variable name="height_increment">2.16</xsl:variable>
	<xsl:variable name="width_increment">4</xsl:variable>
	<xsl:variable name="frame_height">3.12cm</xsl:variable><!-- 2.54cm  -->
	<xsl:variable name="frame_width">3.80cm</xsl:variable>
	<xsl:variable name="number_columns">5</xsl:variable>
	<xsl:variable name="max_frames">65</xsl:variable>

	<xsl:template match="/">
		<xsl:apply-templates select="lots"/>
	</xsl:template>

	<xsl:template match="lots">
		<document>
			<template leftMargin="0cm" rightMargin="0cm" topMargin="0cm" bottomMargin="0cm" title="Address list" author="Sistemas de Datos">
				<pageTemplate id="all">
					<pageGraphics/>
					<xsl:apply-templates select="lot-line" mode="frames"/>
				</pageTemplate>
			</template>
			<stylesheet>
				<paraStyle name="numEan" fontName="Courier" fontSize="6" alignment="CENTER" leading="7" autoLeading="off"/>
				<paraStyle name="code" fontName="Courier" fontSize="9" leading="7" autoLeading="off"/>
				<paraStyle name="variant" fontName="Courier" fontSize="9" leading="7" autoLeading="off"/>
				<paraStyle name="price" fontName="Courier" fontSize="9" alignment="RIGHT" leading="7" autoLeading="off"/>
				<blockTableStyle id="mytable" topMargin="0cm" bottomMargin="0cm"/>
			</stylesheet>
			<story>
				<xsl:apply-templates select="lot-line" mode="story"/>
			</story>
		</document>
	</xsl:template>

	<xsl:template match="lot-line" mode="frames">
		<xsl:if test="position() &lt; $max_frames + 1">
			<frame>
				<xsl:attribute name="width">
					<xsl:value-of select="$frame_width"/>
				</xsl:attribute>
				<xsl:attribute name="height">
					<xsl:value-of select="$frame_height"/>
				</xsl:attribute>
				<xsl:attribute name="x1">
					<xsl:value-of select="$initial_left_pos + ((position()-1) mod $number_columns) * $width_increment"/>
					<xsl:text>cm</xsl:text>
				</xsl:attribute>
				<xsl:attribute name="y1">
					<xsl:value-of select="$initial_bottom_pos - floor((position()-1) div $number_columns) * $height_increment"/>
					<xsl:text>cm</xsl:text>
				</xsl:attribute>
			</frame>
			<nextFrame/>
		</xsl:if>
	</xsl:template>
    <xsl:param name="pmaxChars" as="xs:integer" select="80"/>
	<xsl:template match="lot-line" mode="story">
            <blockTable style="mytable" colWidths="38mm">
            	<tr>
                    <td>
                        	<barCode><xsl:value-of select="ean13" /></barCode>
	                        <para style="numEan" align="center"><xsl:value-of select="ean13"/></para>
                    </td>
                </tr>
                <tr>
                    <td>
                    	<para style="code">
                    		<xsl:value-of select="code"/>
                    		<xsl:text> </xsl:text>
                    		<xsl:value-of select="substring(product, 1, $pmaxChars)"/>
                    	</para>
                    	
                  		<para style="variant"> 
                    		<xsl:for-each select="variants">
                    			<!-- <xsl:value-of select="name"/>
                    			<xsl:text>: </xsl:text>	 -->
                    			<xsl:value-of select="value"/>
                    			<xsl:text>  </xsl:text>
                    		</xsl:for-each>
                    	</para> 
                        <para style="price">
                        	<xsl:value-of select="price"/>
                        	<xsl:text>  </xsl:text>
                        	<xsl:value-of select="currency"/>
                        </para>
                    </td>
                </tr>
            </blockTable>
			<!-- <nextFrame/> -->
	</xsl:template>
</xsl:stylesheet>
